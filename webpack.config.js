//webpack的配置文件是一个基于commonJS规范的模块
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", //development,production
  //入口 单入口
  entry: "./src/index.js",
  //多入口
  // entry:['./src/main.js']

  //出口
  output: {
    //path必须为绝对路径
    path: path.resolve("./dist"),
  },

  //测试服务器
  devServer: {
    static: {
      //设置静态资源服务器根目录
      directory: path.join(__dirname, "public"),
    },

    //默认端口
    port: 3000,
    //支持histroy路由
    // istoryApiFallback: true,
    // proxy: {
    //   "/api": {
    //     target: "http://120.76.247.5:2001",
    //     pathRewrite: {
    //       "^/api": "",
    //     },
    //   },
    // },
  },

  resolve: {
    //默认拓展名
    extensions: [".js", ".jsx"],

    //路径别名
    alias: {
      "@": path.resolve("src"),
      //'@xxx':path.resolve("xxx")xxx指对应文件夹
    },
  },

  //加载器:loader
  module: {
    rules: [
      //一种类型文件的都需要一个加载器来处理
      {
        //匹配规则
        test: /\.jsx?$/,
        //使用加载器：string,object,array
        use: {
          loader: "babel-loader",
          options: {
            //指定预设（配置插件集合）
            presets: ["@babel/preset-react"],
          },
        },
      },
      {
        //css加载器
        test: /\.css$/,

        use: ["style-loader", "css-loader"],
      },
      {
        //scss加载器
        test: /\.s[ac]ss$/,
        //使用加载器：string,object,array
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        //图片加载器
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        //使用加载器：string,object,array
        use: {
          loader: "url-loader",
          options: {
            //如果图片小于10k，则转成base64编码
            //否则使用路径引入
            limit: 10000,
            name: "img/[name].[hash:5].[ext]",
          },
        },
      },
    ],
  },
  //插件Plugin:处理一些加载器无法处理的
  plugins: [
    new HtmlWebpackPlugin({
      //默认生成index文件
      template: "./public/index.html",

      // filename:'' 指定生成文件
    }),
  ],
};
