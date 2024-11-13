export const calculatePoints = (index) => {
    const tablePontis = [
        17,
        13,
        10,
        8,
        7,
        6,
        5,
        4,
        3,
        2
    ]
    const points = tablePontis[index] || 1
    return (points)
}