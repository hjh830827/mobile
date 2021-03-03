import MessageBox from "~/components/common/message-box";

const Modal = {
  alert : (message, options={})=>{
    return new Promise((resolve, reject)=>{
      let defaultOption = {
        title: '알림',
        dangerouslyUseHTMLString: true,
        confirmButtonText: '확인',
      }
      let newOptions = Object.assign(defaultOption, options);
      MessageBox.alert(message, newOptions.title, newOptions);
    });
  },
  confirm : (message, options={})=>{
    return new Promise((resolve, reject)=>{
      let defaultOption = {
        title: '알림',
        dangerouslyUseHTMLString: true,
        cancelButtonText: '취소',
        confirmButtonText: '확인',
        callback: action => {
          if(action === 'confirm') {
            resolve('confirm');
          }
        }
      }
      let newOptions = Object.assign(defaultOption, options);

      MessageBox.confirm(message, newOptions.title, newOptions);
    });
  }
};

export default Modal;