"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Editor } from '@tiptap/react';
import katex from 'katex';

interface MathModalProps {
  editor: Editor | null;
}

export function MathModal({ editor }: MathModalProps) {
  const [open, setOpen] = useState(false);
  const [equation, setEquation] = useState('');
  const [renderError, setRenderError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('inline');
  
  const handleInsert = () => {
    if (!editor || !equation) return;
    
    if (activeTab === 'inline') {
      editor.chain().focus().setMathInline(equation).run();
    } else {
      editor.chain().focus().setMathBlock(equation).run();
    }
    
    setOpen(false);
    setEquation('');
    setRenderError(null);
  };

  const renderPreview = () => {
    if (!equation) return '';
    
    try {
      return katex.renderToString(equation, {
        throwOnError: false,
        displayMode: activeTab === 'block',
      });
    } catch (error) {
      if (error instanceof Error) {
        setRenderError(error.message);
      }
      return '<span class="text-red-500">Error rendering equation</span>';
    }
  };
  
  const ExampleEquations = {
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
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Math
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Insert Mathematical Equation</DialogTitle>
          <DialogDescription>
            Enter LaTeX syntax for your mathematical expression.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="inline">Inline Math</TabsTrigger>
            <TabsTrigger value="block">Block Math</TabsTrigger>
          </TabsList>
          
          <TabsContent value="inline" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="inline-equation">Inline Equation (LaTeX)</Label>
              <Input
                id="inline-equation"
                placeholder="e.g., E=mc^2"
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Examples (click to use)</Label>
              <div className="flex flex-wrap gap-2">
                {ExampleEquations.inline.map((eq, i) => (
                  <Button 
                    key={i} 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEquation(eq)}
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
                onChange={(e) => setEquation(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Examples (click to use)</Label>
              <div className="flex flex-wrap gap-2">
                {ExampleEquations.block.map((eq, i) => (
                  <Button 
                    key={i} 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEquation(eq)}
                  >
                    {eq.length > 20 ? eq.substring(0, 20) + '...' : eq}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {equation && (
          <div className="rounded border p-4">
            <Label className="mb-2 block">Preview</Label>
            <div 
              className="overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: renderPreview() }}
            />
            {renderError && (
              <p className="mt-2 text-sm text-red-500">{renderError}</p>
            )}
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleInsert} disabled={!equation}>
            Insert Equation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}