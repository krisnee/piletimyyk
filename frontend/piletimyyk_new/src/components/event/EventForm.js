// TicketForm.js
export default {
  name: "TicketForm",
  props: {
      id: Number,
      TicketName: String,
      EventDate: String,
      Price: Number
  },
  emits: ['update:id', 'update:TicketName', 'update:EventDate', 'update:Price']
}