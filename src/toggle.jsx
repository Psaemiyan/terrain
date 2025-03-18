import { FaSun, FaMoon } from 'react-icons/fa'

export default function Toggle ({ onToggle, isDay }) 
{
    return (
        <div
            style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(0, 0, 0, 0.6)',
                padding: '10px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex:10
            }}
            onClick={onToggle}
        >
            {isDay ? (
                <FaSun style={{ color: 'yellow', fontSize: '24px' }} />
            ) : (
                <FaMoon style={{ color: 'white', fontSize: '24px' }} />
            )}
        </div>
    );
};