import { useState, useEffect } from 'react';
import { fetchMappedinSecrets } from '@/services/mappedinSecrets';
import { MappedinSecrets } from '@/services/mappedinSecrets';

const useMappedinSecrets = () => {
	const [mappedinSecrets, setSecrets] = useState(null as MappedinSecrets | null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null as Error | null);

	useEffect(() => {
		const getSecrets = async () => {
			try {
				const data = await fetchMappedinSecrets();
				setSecrets(data);
			} catch (err) {
				setError(err as Error);
			} finally {
				setLoading(false);
			}
		};

		getSecrets();
	}, []);

	return { mappedinSecrets, loading, error };
};

export default useMappedinSecrets;