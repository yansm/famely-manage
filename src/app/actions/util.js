import store from 'store';


export
function parseJSON(response) {
  return response.json();
};

export 
function data(res) {
  return res.data;
};

export 
const Json = function() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'f5-Token': store.get('token'),
  };
}


export
const get = {
  method: 'get',
};

export
const post = {
  method: 'post',
};

export
const getJson = function() {
  return {
    ...get,
    headers: {
      ...Json(),
    },
  };
}

export 
const postJson = function() {
  return {
    ...post,
    headers: {
      ...Json(),
    },
  };
}

export 
const body = json => ({ body: JSON.stringify(json) });

