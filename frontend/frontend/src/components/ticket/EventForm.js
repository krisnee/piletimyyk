export default {
  name: "EventForm",
  props: {
      event_id: Number,
      title: String,
      date: String,
      price: Number,
      location: String
  },
  emits: ['update:event_id', 'update:title', 'update:date', 'update:price', 'update:location']
}