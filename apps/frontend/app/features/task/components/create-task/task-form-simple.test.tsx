/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskForm } from './task-form'


// Aplicando os mocks diretamente - evitando problema de hoisting
jest.mock('@/components/ui/button', () => ({
    Button: ({ children, ...props }: any) => <button {...props}>{children}</button>
}))

jest.mock('@/components/ui/input', () => ({
    Input: (props: any) => <input {...props} />
}))

jest.mock('@/components/ui/label', () => ({
    Label: ({ children, ...props }: any) => <label {...props}>{children}</label>
}))

jest.mock('@/components/ui/textarea', () => ({
    Textarea: (props: any) => <textarea {...props} />
}))

jest.mock('@/components/ui/dialog', () => ({
    DialogClose: ({ children }: any) => <div data-testid="dialog-close">{children}</div>,
    DialogFooter: ({ children }: any) => <div data-testid="dialog-footer">{children}</div>
}))

describe('TaskForm testes', () => {
    // Props
    const propsBasicas = {
        title: '',
        description: '',
        isLoading: false,
        onTitleChange: jest.fn(),
        onDescriptionChange: jest.fn(),
        onSubmit: jest.fn(),
    }

    beforeEach(() => {
        // Clear mocks
        jest.clearAllMocks()
    })

    it('deveria renderizar o formulário básico', () => {
        render(<TaskForm {...propsBasicas} />)

        // Verificações básicas -> se os elementos essenciais estão na tela
        expect(screen.getByLabelText('Título *')).toBeInTheDocument()
        expect(screen.getByLabelText('Descrição *')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Cancelar' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Criar Task' })).toBeInTheDocument()
    })

    it('deveria chamar onTitleChange quando usuário digita no título', async () => {
        const mockTitleChange = jest.fn()
        const user = userEvent.setup()

        render(<TaskForm {...propsBasicas} onTitleChange={mockTitleChange} />)

        const inputTitulo = screen.getByLabelText('Título *')

        // Teste digitação simples
        await user.type(inputTitulo, 'abc')

        // Verificando se a função foi chamada para cada caractere
        expect(mockTitleChange).toHaveBeenCalledTimes(3)
        expect(mockTitleChange).toHaveBeenNthCalledWith(1, 'a')
        expect(mockTitleChange).toHaveBeenNthCalledWith(2, 'b')
        expect(mockTitleChange).toHaveBeenNthCalledWith(3, 'c')
    })

    it('deveria desabilitar botão quando campos estão vazios', () => {
        render(<TaskForm {...propsBasicas} />)

        const botaoEnviar = screen.getByRole('button', { name: 'Criar Task' })

        // Campo vazio = botão desabilitado
        expect(botaoEnviar).toBeDisabled()
    })

    it('deveria habilitar botão quando ambos campos estão preenchidos', () => {
        render(<TaskForm
            {...propsBasicas}
            title="Tarefa bacana"
            description="Descrição massa"
        />)

        const botaoEnviar = screen.getByRole('button', { name: 'Criar Task' })

        // Habilitado
        expect(botaoEnviar).not.toBeDisabled()
    })

    it('deveria mostrar estado de carregamento', () => {
        render(<TaskForm
            {...propsBasicas}
            title="Teste"
            description="Teste desc"
            isLoading={true}
        />)

        const botaoEnviar = screen.getByRole('button', { name: 'Criando...' })

        expect(botaoEnviar).toBeDisabled()
        expect(botaoEnviar).toHaveTextContent('Criando...')
    })

    // Testando casos de esppaços vazios e textos longos
    describe('casos chatos da vida real', () => {
        it('deveria tratar espaços como campo vazio', () => {
            render(<TaskForm {...propsBasicas} title="   " description="   " />)

            const botaoEnviar = screen.getByRole('button', { name: 'Criar Task' })

            // Só espaços
            expect(botaoEnviar).toBeDisabled()
        })

        it('deveria funcionar com textos muito longos', async () => {
            const mockTitleChange = jest.fn()
            const user = userEvent.setup()

            render(<TaskForm {...propsBasicas} onTitleChange={mockTitleChange} />)

            const inputTitulo = screen.getByLabelText('Título *')

            // Título longo para testes -> 20 caracteres
            const tituloLongo = 'x'.repeat(20)
            await user.type(inputTitulo, tituloLongo)

            // Verificando se foi chamado 20 vezes e a última chamada foi 'x'
            expect(mockTitleChange).toHaveBeenCalledTimes(20)
            expect(mockTitleChange).toHaveBeenLastCalledWith('x')
        }, 10000) // Timeout de 10 seg pra ter certeza
    })
})
