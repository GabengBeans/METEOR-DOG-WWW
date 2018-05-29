<style scoped>
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col span="6">
                <span class="expand-key">账户余额: </span>
                <span class="expand-value">{{ row.uamount }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">支付ID: </span>
                <span class="expand-value">{{ row.chargeId }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">系统订单号: </span>
                <span class="expand-value">{{ row.orderNo }}</span>
            </Col>
             <Col span="6">
                <span class="expand-key">交易时间: </span>
                <span class="expand-value">{{ row.createTime }}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>
