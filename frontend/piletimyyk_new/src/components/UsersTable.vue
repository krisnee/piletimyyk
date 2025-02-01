<script>
export default {
    name: "UsersTable",
    props: {
        items: Array
    }
}
</script>

<template>
    <table class="table table-striped">
        <thead class="table-dark">
            <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.user_id">
                <td>{{ item.first_name }}</td>
                <td>{{ item.last_name }}</td>
                <td>{{ item.email }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
</style>