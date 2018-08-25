import { Modal } from '../card.js';
Page({
  data: {
    toastList: [{
      mask: true,
      title: '操作成功',
    }, {
      mask: true,
      title: '操作成功',
      content: '详细描述详细描述详细描述详细描述详细描述详细描述详细描述',
    }, {
      duration: 2000,
      title: '透明蒙层',
    }, {
      icon: 'success',
      title: '操作成功',
      iconColor: '#fa8c16',
    }],
    modalList: [{
      mask: true,
      okText: '操作',
      title: '标题文字',
      onOk: 'hideModal',
      content: '详细描述详细描述详细描述详细描述详细描述详细描述详细描述',
    }, {
      mask: true,
      onOk: true,
      okText: '操作',
      title: '标题文字',
      onCancel: 'hideModal',
      content: '点击取消关闭Modal',
    }, {
      mask: true,
      icon: 'info',
      okText: '操作',
      maskClosable: true,
      onCancel: 'hideModal',
      title: '点击蒙层关闭Modal',
    }]
  },
  bindShowTotal: function ({ currentTarget: { id } }) {
    console.log("Show Total " + id + ".");
    Modal.showToast.bind(this)(this.data.toastList[parseInt(id)])
  },
  bindShowModal: function ({ currentTarget: { id } }) {
    console.log("Show Modal " + id + ".");
    Modal.showModal.bind(this)(this.data.modalList[parseInt(id) - 4]);
  },
  hideModal: function (e) { Modal.hideModal.bind(this)({ e }) },
  onShareAppMessage() { }
});