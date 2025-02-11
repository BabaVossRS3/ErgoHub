// AuthToggle.jsx
const AuthToggle = ({ view, setView, onRegisterClick }) => {
    return (
      <div className="text-center text-sm">
        {view === 'login' ? (
          <p>
            Δεν έχεις λογαριασμό;{' '}
            <button
              type="button"
              onClick={() => {
                setView('register');
                onRegisterClick?.();
              }}
              className="text-[#974dc6] hover:underline"
            >
              Εγγραφή
            </button>
          </p>
        ) : (
          <p>
            Έχεις ήδη λογαριασμό;{' '}
            <button
              type="button"
              onClick={() => setView('login')}
              className="text-[#974dc6] hover:underline"
            >
              Σύνδεση
            </button>
          </p>
        )}
      </div>
    );
  };
  export default AuthToggle;