const addParams = (newParams: URLSearchParams, addingParams: Array<{ name: string, value: string }>): void => {
    addingParams.forEach((param) => newParams.set(param.name, param.value))

    const newurl = window.location.protocol + '//' + window.location.host + '?' + newParams.toString();
    window.history.pushState({path: newurl}, '', newurl);

}

export default addParams;
