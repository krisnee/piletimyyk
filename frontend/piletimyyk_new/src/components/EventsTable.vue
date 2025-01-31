<script>
export default {
    name: "EventsTable",
    props: {
        items: Array
    }
}
</script>

<template>
    <table class="table table-striped">
        <thead class="table-dark">
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
                <th>Location</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.event_id">
                <td>{{ item.title }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.date }}</td>
                <td>{{ item.location }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
</style>