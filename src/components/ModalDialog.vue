<template>
  <div class="modal fade" ref="exampleModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header" v-if="headerShow">
          <h5 class="modal-title" id="exampleModalLabel">{{ titleDialog }}</h5>
          <button
            type="button"
            class="bi bi-x-lg btn-close"
            @click="modal.hide()"
            aria-label="Close"
          ></button>
        </div>
        <template v-if="body_model">
          <div class="modal-body">{{ bodyDialog }}</div>
        </template>
        <template v-else>
          <div class="modal-body" :class="bodyClass"><slot></slot></div>
        </template>

        <div class="modal-footer" v-if="footerShow">
          <button type="button" class="btn btn-secondary" @click="modal.hide()">
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="toggleConfirm">
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
export default {
  name: "ModalDialog",
  props: {
    title: { type: String },
    // msg: { type: String },
    "body-class": { type: String },
    headerShow: { type: Boolean, default: true },
    footerShow: { type: Boolean, default: true },
  },
  data: () => ({
    modal: null,
    title_model: null,
    body_model: null,
    dialog_result: false,
    resolver: null,
  }),
  computed: {
    titleDialog() {
      return this.title_model || this.title || "Dialog";
    },
    bodyDialog() {
      return this.body_model || this.msg || "Message";
    },
  },
  mounted() {
    // console.log("mounted  dialog");
    this.modal = new Modal(this.$refs.exampleModal);
  },
  watch: {
    "modal._isShown": function (val) {
      // console.log("watch", val);
      if (!val) {
        if (this.resolver) {
          this.resolver(this.dialog_result);
        }
        this.$emit("close", this.dialog_result);
      }
    },
  },
  methods: {
    async show(body, title) {
      this.dialog_result = false;
      this.title_model = title;
      this.body_model = body;
      this.modal.show();
      // console.log("async", this.modal._isShown);
      return new Promise((resolve) => {
        this.resolver = () => resolve(this.dialog_result);
      });
      //return this.dialog_result;
      //this.modal.show();
    },
    hide() {
      //console.log("hide");
      this.modal.hide();
      //this.resolver();
    },
    toggleConfirm() {
      this.dialog_result = true;
      this.hide();
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
