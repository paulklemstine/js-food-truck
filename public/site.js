
const menuList = document.querySelector(".menu-list")
const eventsList = document.querySelector(".events-list")
const modal = document.getElementById("eventModal")
const closeButton = document.querySelector(".close-button")

const modalElements = {
	name: document.getElementById('modalName'),
    location: document.getElementById('modalLocation'),
    date: document.getElementById('modalDate'),
    time: document.getElementById('modalTime')
}

const getMenu= async () => {
	const response = await fetch('/api/v1/menu')
	return await response.json()
}

const getEvents = async () => {
	const response = await fetch(`/api/v1/events`)
	return await response.json()
}

const getEvent = async id  => {
	const response = await fetch(`/api/v1/events/${id}`)
	return await response.json()
}

const showMenu = menu => {
	menu?.forEach(({name, description, price, image_url}) => {
		const menuItem = document.createElement("div")
		// menuItem.className = "recipe-item"
		menuItem.innerHTML = `
			<img src="${image_url}" alt="${name}" width="300" height = "300">
			<h2>${name}</h2>
		    ${description}<br>
             ${price}</p>
		`
		// recipeItem.onclick = () => showRecipeDetails(id)
		menuList.appendChild(menuItem)
	})
}


const showEvents = events => {
	events?.forEach(({_id, name, location, date, time}) => {
		const eventItem = document.createElement("div")
		// eventItem.className = "event-item"
		eventItem.innerHTML = `
			<h2><a href ="#" onclick="event.preventDefault();showEventDetails('${_id}'); return false;">${name}</a></h2>
		    ${location}<br>
            ${date}<br>
            ${time}</p>
		`
		// recipeItem.onclick = () => showRecipeDetails(id)
		eventsList.appendChild(eventItem)
	})
}

const showEventDetails = async id => {
	const {name,location,date,time} = await getEvent(id)

	modalElements.name.textContent = name
    modalElements.location.textContent = location
    modalElements.date.textContent = date
    modalElements.time.textContent = time

	modal.style.display = 'flex'
}

closeButton.onclick = () => modal.style.display = 'none'

window.onclick = event => {
	if (event.target === modal) modal.style.display = 'none'
}


;(async () => {
	const menu = await getMenu()
    const events = await getEvents()
	showMenu(menu)
    showEvents(events)
})()