const endPoints = {
  events: '/events',
}

export const ROUTES = {
  events:{
    root: endPoints.events,
    getOne: (id: string) => `${endPoints.events}/${id}`,
    getEventAttendees: (id: string) => `${endPoints.events}/${id}/attendees`
  }
}