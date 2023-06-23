<template>
    <div class="page-a4-landscape">
        <div class="a4">
            <div class="center">
                <slot name="header"></slot>
            </div>
            <div class="content">
                <slot name="content"></slot>
            </div>
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped>

    @media print {
        html, body {
            height: auto;
        }

        table {
            background: #000;
            height: auto;
        }

    }
</style>