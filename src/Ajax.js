const apiHost = 'https://bakesaleforgood.com';

export const fetchInitialDeals = async () => {
    try {
        const response = await fetch(apiHost + '/api/deals');
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
};

export const fetchDealDetail = async (dealId) => {
    try {
        const response = await fetch(apiHost + '/api/deals/' + dealId);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
};

export const fetchDealSearchResults = async (searchTerm) => {
    try {
        const response = await fetch(apiHost + '/api/deals?searchTerm=' + searchTerm);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
};