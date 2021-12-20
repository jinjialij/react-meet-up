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

const deleteMeetup = async (id) => {
    const BASE_URL = `https://meetuphere.herokuapp.com/meetups`;
    const url = `${BASE_URL}/${id}`;
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: "",
        })
        if (!response.ok) {
            throw new Error(`Failed to delete Status: ${response.status}`);
        }

        const data = await response.json();
        return data.meetup;
    } catch (err) {
        console.error(err.message)
    }
};

export { fetchMeetups, deleteMeetup }