import React from 'react';

type AvatarProps = {
  name: string;
  bg?: string;
  size?: number;
};

const Avatar: React.FC<AvatarProps> = ({ name, bg, size = 50 }) => {
  // Obtener iniciales
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.4,
        fontWeight: 'bold',
        textTransform: 'uppercase',
      }}
      className={`${bg ? bg : "#3498db"} rounded-full shadow`}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
