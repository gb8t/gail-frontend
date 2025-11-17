import { useState } from 'react';
import api from '../../services/api';
import './style.css';

export default function Formulario() {
	const [step, setStep] = useState(0);
	const [errorMessage, setErrorMessage] = useState('')

	const [data, setData] = useState({
		pessoa_id: "",
		idade_menarca: "",
		idade_menopausa: "",
		terapia_hormonal: "",
		idade_primeiro_parto: "",
		numero_filhos: "",
		numero_biopsias: "",
		hiperplasia_atipica: "",
		alta_densidade_mama: "",
		frequencia_mamografia: "",
		idade_primeira_mamografia: "",
		data_ultima_mamografia: "",
		numero_parentes_cancer: "",
		mutacao_brca1: "",
		mutacao_brca2: "",
		mutacao_desconhecida: "",
		consumo_alcool: "",
		pratica_fisica: "",
		escolaridade: "",
		renda: "",
		plano_saude: "",
	});

	const steps = [
		{
			title: "Dados Básicos",
			fields: [
				{ name: "pessoa_id", label: "ID da pessoa" },
				{ name: "idade_menarca", label: "Idade da menarca" },
				{ name: "idade_menopausa", label: "Idade da menopausa" },
				{ name: "terapia_hormonal", label: "Terapia hormonal" },
			],
		},
		{
			title: "Histórico Reprodutivo",
			fields: [
				{ name: "idade_primeiro_parto", label: "Idade primeiro parto" },
				{ name: "numero_filhos", label: "Número de filhos" },
				{ name: "numero_biopsias", label: "Número de biópsias" },
				{ name: "hiperplasia_atipica", label: "Hiperplasia atípica" },
			],
		},
		{
			title: "Mamografia",
			fields: [
				{ name: "alta_densidade_mama", label: "Alta densidade mamária" },
				{ name: "frequencia_mamografia", label: "Frequência de mamografia" },
				{ name: "idade_primeira_mamografia", label: "Idade primeira mamografia" },
				{ name: "data_ultima_mamografia", type: "date", label: "Data última mamografia" },
			],
		},
		{
			title: "Histórico Familiar & Genética",
			fields: [
				{ name: "numero_parentes_cancer", label: "Nº parentes com câncer" },
				{ name: "mutacao_brca1", label: "Mutação BRCA1" },
				{ name: "mutacao_brca2", label: "Mutação BRCA2" },
				{ name: "mutacao_desconhecida", label: "Mutação desconhecida" },
			],
		},
		{
			title: "Estilo de Vida & Socioeconômico",
			fields: [
				{ name: "consumo_alcool", label: "Consumo de álcool" },
				{ name: "pratica_fisica", label: "Prática física" },
				{ name: "escolaridade", label: "Escolaridade" },
				{ name: "renda", label: "Renda" },
				{ name: "plano_saude", label: "Plano de saúde" },
			],
		},
		{
			title: "Revisar",
			fields: []
		}
	];

	function updateField(name, value) {
		setData((prev) => ({ ...prev, [name]: value }));
	}

	function nextStep() {
    const missing = current.fields.some(
        field => !data[field.name] || data[field.name].trim() === ""
    );

    if (missing) {
        setErrorMessage("Por favor, preencha todos os campos.");
        return;
    }

    setErrorMessage("");
    setStep(step + 1);
	}

	async function submitForm() {
		await api.post('/respostas', data);
		window.location.reload();
	}

	const current = steps[step];

	return (
		<div className="container">
			<h1>{current.title}</h1>
			{errorMessage && <p className="error-message">&#9888; {errorMessage}</p>}
			<form>
				{current.fields.map((field) => (
					<div key={field.name} className="form-group">
						<label>
							{field.label}
							<input
								type={field.type || "text"}
								value={data[field.name]}
								onChange={(e) => updateField(field.name, e.target.value)}
							/>
						</label>
					</div>
				))}
				{step === steps.length - 1 && (
					<div>
						{Object.entries(data).map(([key, value]) => (
							<div key={key}>
								{key}: {String(value)}
							</div>
						))}
					</div>
				)}
				{step === steps.length - 1 && (
					<button type="button" onClick={submitForm}>Enviar</button>
				)}
				{step < steps.length - 1 && (
					<button type="button" onClick={nextStep}>Próximo</button>
				)}
				{step > 0 && (
					<button type="button" onClick={() => setStep(step - 1)}>Voltar</button>
				)}
			</form>
		</div>
	);
}

