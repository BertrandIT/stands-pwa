<template>
  <v-container style="width: 100%" class="mx-0 pa-0">
    <p>
      {{ swipeDirection }}
    </p>
    <swipe-list
      ref="list"
      class="card"
      :items="mockSwipeList"
      item-key="id"
      @swipeout:click="itemClick"
    >
      <template v-slot="{ item, index }">
        <!-- item is the corresponding object from the array -->
        <!-- index is clearly the index -->
        <!-- revealLeft is method which toggles the left side -->
        <!-- revealRight is method which toggles the right side -->
        <!-- close is method which closes an opened side -->
        <div class="card-content">
          <!-- style content how ever you like -->
          <h2>{{ item.title }}</h2>
          <p>{{ item.description }}</p>
          <span>{{ index }}</span>
        </div>
      </template>
      <!-- left swipe side template and v-slot:left="{ item }" is the item clearly -->
      <!-- remove if you dont wanna have left swipe side  -->
      <template v-slot:left="{ item, close }">
        <div class="swipeout-action red" title="remove" @click="remove(item)">
          <!-- place icon here or what ever you want -->
          <i class="fa fa-trash"></i>
        </div>
        <div class="swipeout-action purple" @click="close">
          <!-- place icon here or what ever you want -->
          <i class="fa fa-close"></i>
        </div>
      </template>
      <!-- right swipe side template and v-slot:right"{ item }" is the item clearly -->
      <!-- remove if you dont wanna have right swipe side  -->
      <template v-slot:right="{}">
        <div class="swipeout-action blue">
          <!-- place icon here or what ever you want -->
          <i class="fa fa-heart"></i>
        </div>
        <div class="swipeout-action green">
          <!-- place icon here or what ever you want -->
          <i class="fa fa-heart"></i>
        </div>
      </template>
      <template v-slot:empty>
        <div>
          <!-- change mockSwipeList to an empty array to see this slot in action  -->
          list is empty ( filtered or just empty )
        </div>
      </template>
    </swipe-list>
  </v-container>
</template>
<script>
import { SwipeList } from "vue-swipe-actions";
export default {
  components: {
    SwipeList,
  },
  data() {
    return {
      stands: [1, 2, 4, 5, 6, 7, 8],
      swipeDirection: {},
      mockSwipeList: [
        {
          id: 0,
          title: "Some title",
          description: "some description",
        },
        {
          id: 1,
          title: "Some title",
          description: "some description",
        },
        {
          id: 2,
          title: "Some title",
          description: "some description",
        },
      ],
    };
  },
  computed: {
    windowWidth() {
      return window.innerWidth;
    },
  },
  methods: {
    swipe(direction) {
      this.swipeDirection = direction;
    },
    revealFirstRight() {
      this.$refs.list.revealRight(0);
    },
    revealFirstLeft() {
      this.$refs.list.revealLeft(0);
    },
    closeFirst() {
      this.$refs.list.closeActions(0);
    },
    closeAll() {
      this.$refs.list.closeActions();
    },
    remove(item) {
      this.mockSwipeList = this.mockSwipeList.filter((i) => i !== item);
      // console.log(e, 'remove');
    },
    itemClick(e) {
      console.log(e, "item click");
    },
    fbClick(e) {
      console.log(e, "First Button Click");
    },
    sbClick(e) {
      console.log(e, "Second Button Click");
    },
  },
};
</script>
