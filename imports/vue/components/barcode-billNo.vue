<template>
    <div class="barcode-billNo" style="margin-right: -11px; margin-top: -11px;">
        <svg class="barcode"></svg>
    </div>
</template>


<script>
    import JsBarcode from "jsbarcode"

    export default {
        props: ['doc', 'company'],
        name: "BarcodeBillNo",
        mounted() {
            this.$nextTick(function () {
                JsBarcode(this.$el.querySelector('svg.barcode'), this.doc.observeBarcode || this.doc.barcode, {
                    textAlign: 'right',
                    fontSize: 9,
                    width: 1.5,
                    height: 40,
                    text: this.company.shortName + (this.doc.observeBarcode || this.doc.barcode)
//                marginLeft: 920.7
                });
            });
        }
    }
</script>