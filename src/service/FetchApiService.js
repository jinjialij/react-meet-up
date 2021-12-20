const fetchMeetups = async (url) => {
    let result;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Failed to update, Status: ${res.status}`);
        }
        result = await res.json();
    } catch (error) {
        console.error(error);
    }


    return result;
}

export { fetchMeetups }