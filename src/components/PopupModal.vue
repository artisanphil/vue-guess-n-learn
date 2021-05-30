<template>
    <transition name="fade">
        <div v-if="isVisible" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
            <div class="window">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'PopupModal',

    data: () => ({
        isVisible: false,
    }),

    methods: {
        open() {
            this.isVisible = true
        },

        close() {
            this.isVisible = false
        },
    },
}
</script>
