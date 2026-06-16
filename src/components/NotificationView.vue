<template>
  <div>
    <!-- <div class="mb-4">
      <h2>Toast</h2>

      <div
        class="btn btn-primary me-3"
        @click.prevent="
          showNotification({
            message: 'Hello World 565655',
            title: 'Notification',
            variant: 'success',
          })
        "
      >
        Toast
      </div>
    </div> -->
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 99999">
      <div
        ref="toast1"
        class="toast align-items-center"
        :class="classAlert"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="d-flex" :class="classAlert">
          <div class="toast-body">{{ title || "Bootstrap" }}</div>
          <button
            type="button"
            class="btn-close me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body">
          {{ message || "Hello, world! This is a toast message." }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import bootstrap from '@/plugins/bootstrap';
import { Toast } from "bootstrap";

import { mapGetters } from "vuex";
// const { Toast } = bootstrap;

// console.log("toast", toastList);

export default {
  name: "NotificationView",
  data: () => ({
    message: "",
    title: "",
    variant: "",
  }),
  computed: {
    ...mapGetters(["getMessagePool"]),
    classAlert() {
      return this.variant ? `alert-${this.variant}` : "";
    },
  },

  methods: {
    showNotification({ variant = "", message, title } = {}) {
      if (this.$refs.toast1) {
        this.variant = variant;
        this.message = message;
        this.title = title;

        console.log("showNotification", this.$refs.toast1);
        //this.$refs.toast1.show();
        const toast = new Toast(this.$refs.toast1, { delay: 10000 });
        toast.show();

        console.log("showNotification", variant, message, title, toast);
      }
    },
  },
  watch: {
    getMessagePool: {
      handler: "showNotification",
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style></style>
