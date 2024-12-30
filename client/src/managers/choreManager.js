const _apiUrl = "/api/Chore"

export const getChores = () => {
    return fetch(`${_apiUrl}`).then((r) => r.json())
}

export const getChoreById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((r) => r.json())
}

export const deleteChore = (id) => {
    return fetch(`${_apiUrl}/${id}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
    });

}

export const completeChore = (id, userId) => {
    return fetch(`${_apiUrl}/${id}/complete?userId=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
    });
}

export const createChore = (newChore) => {
    return fetch(`${_apiUrl}`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newChore)
    }).then((res) => res.json());
}

export const assignChore = (userId, choreId) => {
    return fetch(`${_apiUrl}/${choreId}/assign?userId=${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => res.ok);
  };
  
  export const unassignChore = (userId, choreId) => {
    return fetch(`${_apiUrl}/${choreId}/unassign?userId=${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => res.ok);
  };
  