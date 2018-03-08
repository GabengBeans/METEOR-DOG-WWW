<style scoped>
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col span="8">
                <span class="expand-key">支付ID: </span>
                <span class="expand-value">{{ row.chargeId }}</span>
            </Col>
            <!-- <Col span="8">
                <span class="expand-key">收入\支出: </span>
                <span class="expand-value">{{ row.isIncoming }}</span>
            </Col>
             <Col span="8">
                <span class="expand-key">支付方式: </span>
                <span class="expand-value">{{ row.paymentType }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">支出方: </span>
                <span class="expand-value">{{ row.fromUserName }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">接收方: </span>
                <span class="expand-value">{{ row.toUserName }}</span>
            </Col>
            <Col span="8"> -->
                <span class="expand-key">系统订单号: </span>
                <span class="expand-value">{{ row.orderNo }}</span>
            </Col>
             <Col span="8">
                <span class="expand-key">交易时间: </span>
                <span class="expand-value">{{ row.createTime }}</span>
            </Col>
             <!-- <Col span="8">
                <span class="expand-key">数据状态: </span>
                <span class="expand-value">{{ row.status }}</span>
            </Col> -->
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
{
          title: "支付ID",
          key: "chargeId"
        },
// {
        //     title: "交易金额",
        //     key: "amount"
        // },
        // {
        //     title: "收入\支出",
        //     key: "isIncoming"
        // },
        // {
        //     title: "支付方式",
        //     key: "paymentType"
        // },
        // {
        //     title: "支出方",
        //     key: "fromUserName"
        // },
        // {
        //     title: "接收方",
        //     key: "toUserName"
        // },
        // {
        //     title: "系统订单号",
        //     key: "orderNo"
        // },
        // {
        //     title: "交易时间",
        //     key: "createTime"
        // },
        // {
        //     title: "数据状态",
        //     key: "status"
        // }