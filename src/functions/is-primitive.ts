export const isPrimitive = (v: unknown) =>
    !(
        v !== null &&
        typeof v !== 'object' &&
        typeof v !== 'function'
    );
