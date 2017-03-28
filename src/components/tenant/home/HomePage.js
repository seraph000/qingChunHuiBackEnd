import React from "react";
import styles from "./../../HomePage/HomePage.css";
import {Row, Col} from "antd";
import {connect} from "dva";
import HomeCard from "./../../HomePage/HomeCard";
import weixin_001 from "./../../../assets/weixin_001.jpg";

const HomePage = ({result}) => {
    // console.log(JSON.stringify(result));
    return (
        <div className="styles.home">
            <div className={styles.section_to_print}>
                <img src={result.result && result.result.qrCode ? result.result.qrCode : weixin_001}/>
                <p>一句文字描述</p>
            </div>
            <Row gutter={16} className={styles.row}>
                <Col span={6}>
                    <div className={styles.row_1}>
                        <img src={result.result && result.result.qrCode ? result.result.qrCode : weixin_001}/>
                        <p>我的推广二维码</p>
                        <button onClick={()=> {
                            //打印
                            window.print();
                        }}>打印
                        </button>
                    </div>
                </Col>
                <Col span={18}>
                    <div className={styles.row_2}>
                        <div className={styles.br}>
                            <p className={styles.p1 + ' ' + styles.p1_1}>+{result.result && result.result.newTenantProfits ? result.result.newTenantProfits : 0}</p>
                            <p className={styles.p2}>今日我的收益（元）</p>
                        </div>
                        <div className={styles.br}>
                            <p className={styles.p1 + ' ' + styles.p1_2}>{result.result && result.result.tenantProfits ? result.result.tenantProfits : 0}</p>
                            <p className={styles.p2}>我的累计收益（元）</p>
                        </div>
                        <div className={styles.br + ' ' + styles.last}>
                            <p className={styles.p1 + ' ' + styles.p1_3}>{result.result && result.result.money ? result.result.money : 0}</p>
                            <p className={styles.p2}>我的余额（元）</p>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row gutter={16} className={styles.row}>
                <Col span={6}><HomeCard title={'今日新增用户'} add={true} num={result.result && result.result.newUserCount ? result.result.newUserCount : 0}/></Col>
                <Col span={6}><HomeCard title={'今日新增会员'} add={true} num={result.result && result.result.newMemberCount ? result.result.newMemberCount : 0}/></Col>
                <Col span={6}><HomeCard title={'累计用户'} num={result.result && result.result.userCount ? result.result.userCount : 0}/></Col>
                <Col span={6}><HomeCard title={'累计会员'} num={result.result && result.result.memberCount ? result.result.memberCount : 0}/></Col>
            </Row>
            <Row gutter={16} className={styles.row}>
                <Col span={6}><HomeCard title={'今日会员收益'} num={'¥' + result.result && result.result.newMemberProfit ? result.result.newMemberProfit : 0}/></Col>
                <Col span={6}><HomeCard title={'会员累计收益'} num={'¥' + result.result && result.result.memberProfit ? result.result.memberProfit : 0}/></Col>
                <Col span={6}><HomeCard title={'收款二维码剩余数'} blue num={result.result && result.result.surplusQRCodeCount ? result.result.surplusQRCodeCount : 0}/></Col>
            </Row>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        result: state.tenantHomePage,
    }
}

export default connect(mapStateToProps)(HomePage);
