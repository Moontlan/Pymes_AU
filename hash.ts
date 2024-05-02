class SHA256Crypt {
    // Constantes utilizadas en el algoritmo SHA-256
    private static readonly ROUNDS = 5000; // Número de rondas de hash para el cifrado de contraseñas
    private static readonly SALT_LENGTH = 16; // Longitud de la sal utilizada en el cifrado
    private static readonly SALT_CHARS = "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // Caracteres permitidos en la sal

    private static K = new Uint32Array([
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ]);

    // Método público para generar un hash de contraseña cifrado con SHA-256
    public static Hash(password: string, salt: string | null = null): string {
        // Si no se proporciona una sal, se genera una nueva
        if (salt === null || salt === undefined || salt === '') {
            salt = SHA256Crypt.GenerateSalt();
        }

        // Convertir la contraseña y la sal a bytes
        let bytes = new TextEncoder().encode(password + salt);

        // Asegurar que la longitud de bytes sea múltiplo de 4
        const paddingLength = bytes.length % 4;
        if (paddingLength > 0) {
            const newBytesLength = bytes.length + (4 - paddingLength);
            const newBytes = new Uint8Array(newBytesLength);
            newBytes.set(bytes); // Copiar los bytes originales

            const padding = new Uint8Array(4 - paddingLength);
            newBytes.set(padding, bytes.length); // Agregar el relleno al final

            bytes = newBytes;
        }
        
        // Calcular el hash SHA-256 inicial
        let hash = SHA256Crypt.SHA256(bytes);

        // Realizar una operación XOR entre el hash y la sal
        const alternate = new Uint8Array(hash.length);
        for (let i = 0; i < hash.length; i++) {
            alternate[i] = hash[i] ^ salt.charCodeAt(i % SHA256Crypt.SALT_LENGTH);
        }

        let result = `$5$${salt}$`;

        // Realizar varias rondas de hash utilizando el mismo método SHA256
        hash = SHA256Crypt.PerformRounds(alternate, SHA256Crypt.ROUNDS);

        // Codificar el hash final en una representación hexadecimal
        for (let i = 0; i < hash.length; i += 4) {
            const value = (hash[i] << 16) | (hash[i + 1] << 8) | hash[i + 2];
            result += value.toString(16).padStart(6, '0').toLowerCase();
        }

        return result;
    }

    private static GenerateSalt(): string {
        let salt = '';
        const random = new Uint8Array(SHA256Crypt.SALT_LENGTH);
        crypto.getRandomValues(random);

        for (let i = 0; i < SHA256Crypt.SALT_LENGTH; i++) {
            salt += SHA256Crypt.SALT_CHARS[random[i] % SHA256Crypt.SALT_CHARS.length];
        }

        return salt;
    }

    private static SHA256(data: Uint8Array): Uint8Array {
        const M = new Uint32Array(Math.ceil(data.length / 4) * 4);
        M.set(new Uint32Array(data.buffer));
        const H = new Uint32Array([0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19]);

        for (let i = 0; i < M.length; i += 16) {
            const W = new Uint32Array(64);
            for (let j = 0; j < 16; j++) {
                W[j] = M[i + j];
            }
            for (let j = 16; j < 64; j++) {
                W[j] = SHA256Crypt.sigma1(W[j - 2]) + W[j - 7] + SHA256Crypt.sigma0(W[j - 15]) + W[j - 16];
            }

            let a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];

            for (let j = 0; j < 64; j++) {
                const t1 = h + SHA256Crypt.Sigma1(e) + SHA256Crypt.Ch(e, f, g) + SHA256Crypt.K[j] + W[j];
                const t2 = SHA256Crypt.Sigma0(a) + SHA256Crypt.Maj(a, b, c);
                h = g;
                g = f;
                f = e;
                e = d + t1;
                d = c;
                c = b;
                b = a;
                a = t1 + t2;
            }

            H[0] += a;
            H[1] += b;
            H[2] += c;
            H[3] += d;
            H[4] += e;
            H[5] += f;
            H[6] += g;
            H[7] += h;
        }

        const hash = new Uint8Array(32);
        new Uint32Array(hash.buffer).set(H);
        return hash;
    }

    // Método para realizar varias rondas de hash utilizando el mismo método SHA256
    private static PerformRounds(data: Uint8Array, rounds: number): Uint8Array {
        let hash = new Uint8Array(data);
        for (let i = 0; i < rounds; i++) {
            // Llamar al método SHA256 para realizar una ronda de hash
            hash = SHA256Crypt.SHA256(hash);
        }

        return hash;
    }
    // Métodos auxiliares para las operaciones de hash
    private static sigma0(x: number): number {
        return (x >>> 7 | x << 25) ^ (x >>> 18 | x << 14) ^ (x >>> 3);
    }
    
    private static sigma1(x: number): number {
        return (x >>> 17 | x << 15) ^ (x >>> 19 | x << 13) ^ (x >>> 10);
    }
    
    private static Sigma0(x: number): number {
        return (x >>> 2 | x << 30) ^ (x >>> 13 | x << 19) ^ (x >>> 22 | x << 10);
    }
    
    private static Sigma1(x: number): number {
        return (x >>> 6 | x << 26) ^ (x >>> 11 | x << 21) ^ (x >>> 25 | x << 7);
    }
    
    private static Ch(x: number, y: number, z: number): number {
        return (x & y) ^ (~x & z);
    }
    
    private static Maj(x: number, y: number, z: number): number {
        return (x & y) ^ (x & z) ^ (y & z);
    }
}

export default SHA256Crypt;