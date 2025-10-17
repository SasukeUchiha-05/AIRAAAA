function Footer() {
  return (
    <footer style={{
      backgroundColor: '#f1f1f1',
      padding: '1rem',
      textAlign: 'center',
      fontSize: '0.9rem',
      marginTop: '2rem'
    }}>
      © {new Date().getFullYear()} AIRA Technologies — All rights reserved
    </footer>
  )
}

export default Footer
