<template>
  <div class="hello">
    <button @click="addUser">Add User</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    ...mapActions("users", ["addNewUser"]),
    addUser() {
      const newUser = {
        name: "Ivan",
        age: 25,
      };
      console.log("adding");
      this.addNewUser(newUser);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
