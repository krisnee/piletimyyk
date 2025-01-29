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
                <th>User id</th>
                <th>First name</th>
                <th>Last name</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.user_id">
                <td>{{ item.user_id }}</td>
                <td>{{ item.First name }}</td>
                <td>{{ item.Last name }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
</style>