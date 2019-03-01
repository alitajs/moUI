let Modal = {
  showToast: function ({ dataName = 'Toast', icon = 0, iconColor = '', title = null, content = null, duration = 1500, mask = false, that = this } = {}) { that.setData({ [dataName]: { show: true, icon, iconColor, title, content, mask } }); setTimeout(r => { that.setData({ [dataName + '.show']: false }) }, duration) },
  showModal: function ({ dataName = 'Modal', id = 'Modal', icon = 0, iconColor = '', title = null, content = null, mask = false, maskClosable = false, onCancel = null, onOk = null, cancelText = null, okText = null, that = this } = {}) { onOk || onCancel ? that.setData({ [dataName]: { show: true, id, icon, iconColor, title, content, mask, maskClosable, onCancel, onOk, cancelText, okText } }) : 0 },
  hideModal: function ({ dataName = 'Modal', id = 'Modal', e, that = this } = {}) { e === undefined || e.target.id === id ? that.setData({ [dataName + '.show']: false }) : 0 },
};
export { Modal }