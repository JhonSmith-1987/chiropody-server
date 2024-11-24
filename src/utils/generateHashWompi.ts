import crypto from 'crypto';

export async function generateHash(reference: string, amount_in_cents: number, currency: string, integritySecret: string | undefined) {
    const text = `${reference}${amount_in_cents}${currency}${integritySecret}`;
    const hash = crypto.createHash('sha256');
    hash.update(text);
    return hash.digest('hex');
}