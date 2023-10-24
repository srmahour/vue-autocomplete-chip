<template>
  <div class="chipbox-area w-630" @click="focusFun" v-click-outside="outsideClick">
    <div v-for="chip in chips" :key="chip" class="chip">
      {{ chip }}
      <button @click="removeChip(chip)" class="close"></button>
    </div>
    <div class="relative">
      <input ref="inputField" v-model="query" @input="onInput" @keydown.delete="onBackspace" class="chip-input-field">
      <div v-if="showDropdown && filteredItems.length" class="chip-list">
        <div class="chip-list-item"
          v-for="item in filteredItems" 
          :key="item" 
          @click="onItemSelect(item)"
          
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { clickOutside } from '../directives/clickOutside';
export default {
  data() {
    return {
      query: '',
      items: ['SingleID Authenticator', 'SMS', 'Email', 'Google OTP', 'Password'],
      chips: [],
      showDropdown: false
    };
  },
  directives: {
    clickOutside
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => item.toLowerCase().includes(this.query) && !this.chips.includes(item));
    }
  },
  methods: {
    onInput() {
      this.showDropdown = !!this.query;
    },
    onItemSelect(item) {
      if (!this.chips.includes(item)) {
        this.chips.push(item);
      } else {
        this.removeChip(item);
      }
      this.query = '';
      this.showDropdown = false;
    },
    onBackspace() {
      if (!this.query && this.chips.length) {
        this.chips.pop();
      }
    },
    removeChip(chip) {
      const index = this.chips.indexOf(chip);
      if (index > -1) {
        this.chips.splice(index, 1);
      }
    },
    focusFun(){
      this.$refs.inputField.focus();
    },
    outsideClick() {
    this.showDropdown = false;
  }
      
    },
};
</script>

<style scoped>


.h-60{height: 60px;}
        .w-630{width: 630px;}

        body {font-family: "Noto Sans Korean", sans-serif;}
        .close {height: 16px;width: 16px;display: block;position: relative;opacity: 0.6; margin-left: 6px; border: 0;}
        .close:after, .close:before {position: absolute;content: '';height: 10px;width: 1px;background: #333;left: 0;right: 0;top: 0;bottom: 0;margin: auto;}
        .close:after {transform: rotate(45deg);}
        .close:before {transform: rotate(-45deg);}
        .chip {display: flex;width: fit-content;font-size: 14px;line-height: normal;background: #eaeefb;border: 1px solid #809be8;border-radius: 100px;align-items: center;padding: 2px 16px; cursor: pointer; margin: 4px;}
        .chipbox-area {display: flex;flex-wrap: wrap; border: 1px solid #adadad; border-radius: 2px; position: relative; padding:0 5px;}
        .chipbox-area.focus{ border-color: #2c59d9;}
        .chip-list {position: absolute; background: #fff; border: 1px solid #2c59d9; top: 36px; min-width: 170px;}
        .chip-input-field{border: 0; height: 32px;}
        .chip-input-field:focus{outline: none; box-shadow: none;}
        .chip-list-item{font-size: 14px;line-height: normal;padding: 7px 10px;color: #333;cursor: pointer;display: block;}
        .chip-list-item:hover{background: #eaeefb;color: #2c59d9;}
        .relative{ position: relative;}
</style>
