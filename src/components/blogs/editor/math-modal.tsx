'use client';

import 'katex/dist/katex.min.css';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Editor } from '@tiptap/react';
import katex from 'katex';
import { useCallback, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

type TabType = 'inline' | 'block';

interface MathModalProps {
  editor: Editor | null;
}

const EXAMPLE_EQUATIONS = {
  inline: [
    'E=mc^2',
    '\\sqrt{a^2 + b^2}',
    '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}',
  ],
  block: [
    'f(x) = \\int_{-\\infty}^{\\infty} \\hat{f}(\\xi)\\,e^{2 \\pi i \\xi x} \\,d\\xi',
    '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}',
    '\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}',
  ],
} as const;

export function MathModal({ editor }: MathModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [equation, setEquation] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tabMode, setTabMode] = useState<TabType>('inline');

  const renderPreview = useCallback(() => {
    if (!equation) return '';

    try {
      return katex.renderToString(equation, {
        displayMode: tabMode === 'block',
        throwOnError: false,
        output: 'html',
        strict: false,
        trust: true,
        macros: {
          '\\RR': '\\mathbb{R}',
          '\\NN': '\\mathbb{N}',
          '\\ZZ': '\\mathbb{Z}',
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
      return tabMode === 'block' ? `\\[${equation}\\]` : `\\(${equation}\\)`;
    }
  }, [equation, tabMode]);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setEquation('');
      setErrorMessage(null);
    }
  }, []);

  const handleEquationChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEquation(e.target.value);
      setErrorMessage(null);
    },
    []
  );

  const handleTabChange = useCallback((value: string) => {
    if (value === 'inline' || value === 'block') {
      setTabMode(value);
      setErrorMessage(null);
    }
  }, []);

  const handleExampleClick = useCallback((eq: string) => {
    setEquation(eq);
    setErrorMessage(null);
  }, []);

  const handleEquationInsert = useCallback(() => {
    console.log('Inserting equation: ', equation);
    console.log('editor ', editor, 'equation ', equation);

    if (!editor || !equation) return;

    try {
      // Test if the equation is valid first
      katex.renderToString(equation, {
        throwOnError: true,
        displayMode: tabMode === 'block',
      });

      if (tabMode === 'block') {
        editor.commands.setMathBlock(equation);
      } else {
        editor.commands.setMathInline(equation);
      }

      handleOpenChange(false);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        console.error('Error inserting equation:', error);
      }
    }
  }, [editor, equation, tabMode, handleOpenChange]);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Trigger asChild>
        <Button variant="outline" size="sm">
          Math
        </Button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 w-[95vw] max-w-[525px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-[#1a1a1a] border border-[#333] p-6 shadow-lg text-white">
          <div className="space-y-4">
            <div className="space-y-2">
              <DialogPrimitive.Title className="text-lg font-semibold">
                Insert Mathematical Equation
              </DialogPrimitive.Title>
              <p className="text-sm text-gray-400">
                Enter LaTeX syntax for your mathematical expression.
              </p>
            </div>

            <Tabs
              defaultValue="inline"
              value={tabMode}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-[#1a1a1a] border-[#333]">
                <TabsTrigger value="inline">Inline Math</TabsTrigger>
                <TabsTrigger value="block">Block Math</TabsTrigger>
              </TabsList>

              <TabsContent value="inline" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="inline-equation">
                    Inline Equation (LaTeX)
                  </Label>
                  <Input
                    id="inline-equation"
                    placeholder="e.g., E=mc^2"
                    value={equation}
                    onChange={handleEquationChange}
                    className="bg-[#252525] border-[#333] text-white placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Examples (click to use)</Label>
                  <div className="flex flex-wrap gap-2">
                    {EXAMPLE_EQUATIONS.inline.map((eq, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        onClick={() => handleExampleClick(eq)}
                        className="border-[#333] hover:bg-[#252525]"
                      >
                        {eq}
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="block" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="block-equation">Block Equation (LaTeX)</Label>
                  <Input
                    id="block-equation"
                    placeholder="e.g., \sum_{i=0}^n i^2 = \frac{n(n+1)(2n+1)}{6}"
                    value={equation}
                    onChange={handleEquationChange}
                    className="bg-[#252525] border-[#333] text-white placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Examples (click to use)</Label>
                  <div className="flex flex-wrap gap-2">
                    {EXAMPLE_EQUATIONS.block.map((eq, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        onClick={() => handleExampleClick(eq)}
                        className="border-[#333] hover:bg-[#252525]"
                      >
                        {eq.length > 20 ? eq.substring(0, 20) + '...' : eq}
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {equation && (
              <div className="rounded border border-[#333] p-4">
                <Label className="mb-2 block">Preview</Label>
                <div className="overflow-x-auto space-y-2">
                  <div
                    className={`bg-[#252525] p-4 rounded-md overflow-x-auto ${
                      tabMode === 'block' ? 'flex justify-center w-full' : ''
                    }`}
                    dangerouslySetInnerHTML={{ __html: renderPreview() }}
                  />
                  {errorMessage && (
                    <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/50 p-2 rounded">
                      {errorMessage}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 mt-4">
              <DialogPrimitive.Close asChild>
                <Button
                  variant="outline"
                  className="border-[#333] hover:bg-[#252525]"
                >
                  Cancel
                </Button>
              </DialogPrimitive.Close>
              <Button
                onClick={handleEquationInsert}
                disabled={!equation}
                className="bg-primary-purple hover:bg-primary-purple/90"
              >
                Insert Equation
              </Button>
            </div>
          </div>

          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
