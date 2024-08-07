export const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://100.101.25.64/api/auth/google';
  };

  return (
    <button onClick={handleGoogleLogin} style={buttonStyle}>
      Login with Google
    </button>
  );
};

const buttonStyle = {
  backgroundColor: '#4285F4',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px'
};
