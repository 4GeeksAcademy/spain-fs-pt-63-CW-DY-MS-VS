const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			client:null,
			artist:null
		},
		actions: {
			registerUserClient: async(userClient)=>{
				try{
					// fetching data from the backend
					const store = getStore();
					const resp = await fetch(process.env.BACKEND_URL + "/api/user_client",{
						method: 'POST' ,
						headers:{
							'Content-Type':'application/json'
						},body:JSON.stringify(userClient)
					})
					const client = await resp.json()
					setStore({...store, client  })
					// don't forget to return something, that is how the async resolves
					return client;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			registerUserArtist: async(userArtist)=>{
				try{
					// fetching data from the backend
					const store = getStore();
					const resp = await fetch(process.env.BACKEND_URL + "/api/user_artist",{
						method: 'POST' ,
						headers:{
							'Content-Type':'application/json'
						},body:JSON.stringify(userArtist)
					})
					const artist = await resp.json()
					setStore({...store, artist  })
					// don't forget to return something, that is how the async resolves
					return artist;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			
			// Use getActions to call a function within a fuction
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
		}
	};
};

export default getState;
