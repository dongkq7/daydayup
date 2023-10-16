var API = (function() {
  const BASE_URL = 'https://study.duyiedu.com'
  const TOKEN_KEY = 'Token'

  function get(url) {
    const headers = {}
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(`${BASE_URL}${url}`, { headers })
  }

  function post(url, bodyObj) {
    const headers = {
      'Content-Type': 'application/json'
    }
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(`${BASE_URL}${url}`, {
        headers, 
        method: 'POST',
        body: JSON.stringify(bodyObj)
      })
  }
  // 注册
  async function reg(userInfo) {
    // const resp = await fetch(`${BASE_URL}/api/user/reg`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(userInfo)
    // })
    // return await resp.json()
    const resp = await post('/api/user/reg', userInfo)
    return await resp.json()
  }

  // 登录
  async function login(loginInfo){
    // const resp = await fetch(`${BASE_URL}/api/user/login`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(loginInfo)
    // })
    // const result = await resp.json()
    const resp = await post('/api/user/login', loginInfo)
    const result = await resp.json()
    if (result.code === 0) {
      // 登录成功，将 token 保存在 localstorage 里面
      localStorage.setItem(TOKEN_KEY, resp.headers.get('authorization'))
    }
    return result
  }

  // 验证账号
  async function exists(loginId){
    const resp = await get(`/api/user/exists?loginId=${loginId}`);
    return await resp.json();
  }

  // 用户信息
  async function profile() {
    const resp = await get('/api/user/profile');
    return await resp.json();
  }

  // 发送消息
  async function sendChat(content) {
    const resp = await post('/api/chat', {
      content,
    });
    return await resp.json();
  }

  // 获取聊天记录
  async function getHistory() {
    const resp = await get('/api/chat/history');
    return await resp.json();
  }

  function loginOut() {
    localStorage.removeItem(TOKEN_KEY);
  }

  return {
    reg,
    login,
    exists,
    profile,
    sendChat,
    getHistory,
    loginOut,
  }
})()