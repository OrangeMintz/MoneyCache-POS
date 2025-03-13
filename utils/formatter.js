export const formatNumber = (num) => {
    return Number(num).toLocaleString();
};

export const formatTime = (createdAt) => {
    if (!createdAt) return "N/A";
    return new Date(createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};

export const formatDate = (createdAt) => {
    return new Date(createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });
};

export const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
};

