import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';
import { Modal } from 'antd';

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true
  }),
  onError (error) {
    Modal.error({
      title: '错误',
      content: (
        <div>
          <p>{error.message}</p>
        </div>
      )
    });
  }
});

// 2. Plugins
// app.use({});

// 3. Model
//app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
