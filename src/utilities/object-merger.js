export default (...objects) => objects.reduce((accumulator, value) =>
{
    const accumulatorKeys = Object.keys(accumulator);
    const valueKeys = Object.keys(value);

    valueKeys.forEach((vKey) =>
    {
        if (accumulatorKeys.includes(vKey))
        {
            throw new Error(`The key: "${vKey}" is duplicated.`);
        }
    });

    return {...accumulator, ...value};
}, {});
