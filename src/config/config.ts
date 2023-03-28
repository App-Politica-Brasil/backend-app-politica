interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
    type: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
}

const firebaseConfig: FirebaseConfig = {
    apiKey: 'AIzaSyD93B5_BVHFz0xpojdpts7fJwugcFRN7Eg',
    authDomain: 'app-vote-cfb52.firebaseapp.com',
    projectId: 'app-vote-cfb52',
    storageBucket: 'app-vote-cfb52.appspot.com',
    messagingSenderId: '409358300009',
    appId: '1:409358300009:web:581c7a4d9f59e55c5f83f8',
    measurementId: 'G-PWPSMEKR25',
    type: 'service_account',

    private_key_id: 'c2543bcbec63f1c6e4858562a32bd6c74061707f',
    private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCsFU9S2PBo6XDS\nNeROX55rNP6RoM0JIyR7f9XemyTvDY78bRNxk4axtLtV1Mzej144ngyNO40TmxI7\npHO+/tLXbCpFzk30XzhrohlKpL8CJR7F+DAMejFemnea8waaUrUvNK3gdPmyKfe6\nnpopeTUh7CbcKW+jlEsJ7B1q1HcxQOdSAJhoor/5FHVtkTQ3KllzkvCtZq1zNyMv\nw1jhyQoy/EKcdNXerI6JfPknbvZ1fn179L1zC2cryCb2TaXUF7Y9OFmpN1v/ldAB\nGgINf144oq85EebHa4g7rvv4mcPSJX8U4edr2cIebXEoGQ2LF8Ajwzeom2fs3+WA\nnsguK4VDAgMBAAECggEAGWO9g+5BLmF/BWzxJgUipRO5Gbh9eAMo31Xhssn2PZUl\nCyZ2z3OiVHbjiwruPUou7zCWjoICUym2m3ksoLoNVr59UDZbtxoTg4HztFkxW3op\nm7D+OeEPhrNIwWJpD3zzgacGno7zxm89v1mmSkc5aStkImi0sZBwL+MYBgqaGXiJ\nkYd+x59os3mLdGIgdASO/LxBkZ1PM1kxAnXFifcElArDiXUYGfQvxdqHG7mH8qfe\nUSt1F1gm2StEOMHBzEoRaw+3JwIAAyfRkTCOJ4ICFpVhBj4xh9Tk0612h3XCNgO/\nANg+Kytl9ciSrJ9ObxZiBC1DZxQLjJ4Gi+ROdll56QKBgQDYf5oC8Of4SL46C5SC\nf1hUIWoxCVwykqD02Tdypxa1Cf9oG8nnKoQqN3vSDEClIZJZr76A/o52Dz96HPPC\nIx3Bwsn9vPHQURGuwIgIQq8EjsQWTngnYNLkBAP0jgfMq+vi/ThaYjU/f9zPTmqJ\nA60cR+TeRk9syOt+CLg2k/VBuwKBgQDLex/LddhKhKIjPU3HOaPmtUMLH9rAHlRG\nd01F0wF6gGLHudmoxM2M1tkcPqdbV/pbjZP2xzCEQ6XM8whOJWP3+DJwxB5IXWoZ\nXMoRMci5EFQhVr7EBR4IFEow8cHT4/+8I1TN2czvIrbMC9ozL/YUxe02d7dpxnFq\nLyocP3GuGQKBgBx7fRmR9BK4Dz63s0wP0OEQnFXjM1v76m0L/r14ugYLUKyzqzZc\nY5LiRcn2jrKq3gQqmNeDpd5mVyWLlY4e7JVHOSfGqdGMONVSwxLDIx9oYOfGXwxf\nMp+I37RW0zPcEmaEhdtuPC8kdTpYyK9J6oZj9vo/KcfYDxM/tmyHvqZtAoGBAI+1\nv7jk3AOVNSYKT/pa3UU908Hxl3+EbCTwcWTVKAAq2JkSy4UEqd/EhcYLAgvjUPCE\nR3JNMBjZ5imfo8f9ZGNnqcg22uRlBWAwRo5qSMdbnu+E4mpy6sjt+5AhzrEmICHy\nGhzgrHpgXBY0cMEiKHx3ZZfIaYONIeDKusUEkfdRAoGAQer3rlZpZ18Sr4YFdgtQ\nPtWCXKGk3qPjNMXAmxVn2+9FNHoQhLEdYxtmVo5S7C1XFMUZMJSsuor9FKEEIFO6\nHVab41RcRXubQhBBfDmMdNREBcwWtHvicUmXfzqKB2SC5Jjf+9NC8MPksfOrQlpV\nEOxLudagqGCS/YIhA6bKioU=\n-----END PRIVATE KEY-----\n',
    client_email:
        'firebase-adminsdk-89raj@app-vote-cfb52.iam.gserviceaccount.com',
    client_id: '109868119731825466448',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-89raj%40app-vote-cfb52.iam.gserviceaccount.com',
};

export default firebaseConfig;
