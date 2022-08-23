/**
 * Web开发模式：
 *  ①基于服务端渲染的传统Web开发模式
 *      服务器发送给客户端的HTML页面，是在服务器通过字符串的拼接，动态生成的。
 *      因此，客户端不需要使用Ajax这样的技术额外请求页面的数据。
 *      优点:
 *          ①前端耗时少。 因为服务器端负责动态生成HTML内容,浏览器只需要直接渲染页面即可。尤其是移动端，更省电。
 *          ②有利于SEO. 因为服务器端响应的是完整的HTML页面内容，所以爬虫更容易爬取获得信息，更有利于SEO。
 *      缺点:
 *          ①占用服务器端资源。 即服务器端完成HTML页面内容的拼接,如果请求较多，会对服务器造成一定的访问压力。
 *          ②不利于前后端分离， 开发效率低。使用服务器端渲染，则无法进行分工合作,尤其对于前端复杂度高的项目，不利于项目高效开发。

 *  ②基于前后端分离的新型Web开发模式
 *      前后端分离的开发模式，依赖于Ajax技术的广泛应用。简而言之，前后端分离的Web开发模式,
 *      就是后端只负责提供API接口,前端使用Ajax调用接口的开发模式。
 *      优点:
 *           ①开发体验好。 前端专注于UI页面的开发，后端专注于api的开发，且前端有更多的选择性。
 *           ②用户体验好。 Ajax 技术的广泛应用，极大的提高了用户的体验，可以轻松实现页面的局部刷新。
 *           ③减轻了服务器端的渲 染压力。因为页面最终是在每个用户的浏览器中生成的。
 *       缺点:
 *          ①不利于SEO.因为完整的HTML页面需要在客户端动态拼接完成，所以爬虫对无法爬取页面的有效信息。(解决方
 *           案:利用Vue、React 等前端框架的SSR (server side render)技术能够很好的解决SEO问题! )
 *
 */

/*

如何选择Web开发模式

不谈业务场景而盲目选择使用何种开发模式都是耍流氓。

●比如企业级网站，主要功能是展示而没有复杂的交互，并且需要良好的SEO,则这时我们就需要使用服务器端渲染;
●而类似后台管理项目，交互性比较强，不需要考虑SEO,那么就可以使用前后端分离的开发模式。

另外，具体使用何种开发模式并不是绝对的，为了同时兼顾了首页的渲染速度和前后端分离的开发效率，一些网站采用了
首屏服务器端渲染+其他页面前后端分离的开发模式。

 * 
 */