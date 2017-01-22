import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as fameAction from 'actions/fame.action';
import { Table,Modal,Button,Form,Input,Radio} from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: '80%',
  },{
    title: '操作',
    dataIndex: '',
    key: 'x',
    width: '20%',
    render: (item,row,index) => {
      return (
        <div className={'table-btn-area'}>
          <Button type="primary" icon="edit">编辑</Button>
          <Button icon="delete">删除</Button>
        </div>
      );
    }
  },
];

@connect((fame) => (fame), dispatch => ({actions: bindActionCreators({...fameAction}, dispatch)}))
class Component extends React.Component {
  
  constructor(props) {
    super(props);
    this.displayName = 'Component';
    this.handleTableChange = this.handleTableChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      loading: false,
      visible: false,
      modalLoading: false,
    };
  }
  componentDidMount() {
    this.props.actions.listMomentUser(); 
  }
  handleTableChange(pagination, filters, sorter) {
    this.setState({
      loading: true,
    })
    this.props.actions.listMomentUser({},() => {
      this.setState({
        false,
      })
    }); 
  }
  showModal() {
    this.setState({
      visible: true,
    });
  }
  handleOk() {
    this.setState({ modalLoading: true });
    this.props.form.submit(this.handleSubmit);
  }
  handleCancel() {
    this.setState({ visible: false });
  }
  handleSubmit(e) {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        setTimeout(()=>{
          this.setState({ modalLoading: false, visible: false });
        }, 800)
      }
    });
  }
  render() {
    const {
      momentList,
    } = this.props.fame;
    const {
      pageNum = 1,
      pageCount = 1,
      data = []
    } = momentList || {};
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button className={'table-btn-plus'} type="ghost" onClick={this.showModal} icon="plus">添加</Button>
        <Table columns={columns}
          dataSource={data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
        <Modal
          visible={this.state.visible}
          title="添加/编辑弹窗"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" type="ghost"  onClick={this.handleCancel}>返回</Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>提交</Button>,
          ]}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem label="榜单名称">
              {getFieldDecorator('arg1', {
                rules: [{ required: true, message: '该项必填' }],
              })(
                <Input placeholder="arg1" />
              )}
            </FormItem>
            <FormItem
              label="开启"
            >
              {getFieldDecorator('arg2',{
                rules: [{ required: true, message: '该项必填' }],
              })(
                <RadioGroup>
                  <Radio value="a">开启</Radio>
                  <Radio value="b">关闭</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem label="榜单名称">
              {getFieldDecorator('arg3', {
                rules: [{ required: true, message: '该项必填' }],
              })(
                <Input  type="textarea" rows={4} placeholder="arg3" />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(Component);
 