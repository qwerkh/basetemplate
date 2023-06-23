<template>
    <div class="page-a4">
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
    /*@page {
        size: A4;
        margin: 0;
    }*/

    /*@page {
        margin-top: 500mm !important;
    }
*/

    @media print {
        html, body {
            /*width: 210mm;*/
            height: auto;
        }

        table {
            background: #000;
            height: auto;
        }
    }
</style>