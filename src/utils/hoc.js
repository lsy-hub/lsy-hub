import React from "react"
import { Redirect,withRouter } from "react-router-dom"
import request from '@/utils/request'


export function withUser(InnerComponent){
    return function OuterComponent(props){
        let userInfo = localStorage.getItem('userInfo')
        try{
            userInfo = JSON.parse(userInfo) || {}
        }catch(err){
            userInfo = {}
        }
        return <InnerComponent userInfo={userInfo} {...props}></InnerComponent>
    }
}

export function withAuth(InnerComponent){
    class OuterComponent extends InnerComponent{
        componentDidMount(){
            super.componentDidMount();
        }
        render(){
            // super: 父类（Mine）
            console.log('OuterComponent.props',this.props)
            return (
                this.props.userInfo.authorization ? 
                super.render()
                :
                <Redirect to="/login" />
                // <div>
                //     只有登录后才能访问
                // </div>
            )
        }
    }

    OuterComponent = withUser(OuterComponent)

    return OuterComponent
}


export function withLogin(InnerComponent){
    function OuterComponent(props){
        // 判断用户是否登录
        if(props.userInfo.Authorization){
            // 校验token有效性（是否过期，是否被篡改）
            request.get('/user/verify').then(({data})=>{
                if(data.status === 401){
                    props.history.push({
                        pathname:'/login',
                        search:'targetUrl='+props.location.pathname
                    })
                }
            })
            return <InnerComponent {...props}></InnerComponent>
        }else{
            return <Redirect to="/login" />
        }
    }

    OuterComponent = withUser(OuterComponent)
    OuterComponent = withRouter(OuterComponent)

    return OuterComponent
}
